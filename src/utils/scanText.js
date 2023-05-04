export const TEXT_PART = "T";
export const LINK_PART = "L";

// About this regexp:
// * entire thing wrapped in () so that matches end up in split results
// * if current bit fails to match link/raw link, then it matches a single character
// * newline is matched separately since "." doesn't match it
const SCAN = /((?:[a-z][a-z0-9+\-.]*:\/\/\S+)|\+?(?:\(\d{1,4}\)?)?\s?\d(?:\d+[-\s]?){5,12}\d|[^@\s]+@[^.\s]+\.(?:com|org|edu|gov|uk|net|ca|de|dev|jp|fr|au|us|ru|ch|it|nl|se|no|es|mil)|\[.+?\]\(.+?\)|(?:[a-z]+:\/\/\S+)|(?:onenote:\S+)|(?:www\.\S+\.\S+)|(?:[^.\s"<>#%(){}|\\^~[\]`]+\.(?:com|org|edu|gov|uk|net|ca|de|dev|jp|fr|au|us|ru|ch|it|nl|se|no|es|mil)(?:\/\S*)?)|\n|.)/gi;
//             URL something://anything       telephone number                               email                                                                                      [text](link)   foo://bar          onenote:foo     www.foo.bar       anything.com

/**
 * Scan text for tokens.
 *
 * The returned parts have type TEXT_PART or LINK_PART.
 *
 * The default text type parts look like this:
 *
 *     {
 *       type: TEXT_PART,
 *       text: "example text"
 *     }
 *
 * The link part looks like this:
 *
 *     {
 *       type: LINK_PART,
 *       text: "here",
 *       href: "http://google.com",
 *     }
 *
 * @param {String} text - Source text.
 * @param {Object} [options] - Scan options.
 * @returns {Object[]} Returns an array of parts.
 */
export default function scanText(fullText, options={ }) {
  if (!fullText) {
    return [];
  }

  const rawParts = fullText.split(SCAN);

  const parts = [];
  let hasTextPart = false;

  for (const text of rawParts) {
    if (text.length === 0) {
      continue;
    }

    // All raw-texts have length 1.
    if (text.length === 1) {
      if (hasTextPart) {
        parts[parts.length - 1].text += text;
      } else {
        hasTextPart = true;
        parts.push({
          type: TEXT_PART,
          text,
        });
      }

      continue;
    }

    hasTextPart = false;

    // Prevent https://example.com/me@domain.com/mail/12345 from being
    // interpreted as an email.
    let forceLink;
    if (/(?:[a-z][a-z0-9+\-.]*:\/\/\S+)/.test(text)) {
      forceLink = true;
    }

    if (!forceLink && /^[^@]+@[^.]+\.(?:com|org|edu|gov|uk|net|ca|de|jp|fr|au|us|ru|ch|it|nl|se|no|es|mil)$/.test(text)) {
      // It's an email
      const email = text;
      hasTextPart = false;
      parts.push({
        type: LINK_PART,
        linkType: "email",
        text: email,
        href: `mailto:${email}`,
        raw: email,
      });
    } else if (/^\+?(?:\(\d{1,4}\)?)?\s?\d(?:\d+[-\s]?){5,12}\d$/.test(text)) {
      hasTextPart = false;
      parts.push({
        type: LINK_PART,
        linkType: "tel",
        text: text,
        href: `tel:${text}`,
        raw: text,
      });
    } else if (/^\[(.+?)\]\((.+?)\)$/.test(text)) {
      // It's a link, duration, etc.
      let linkText = RegExp.$1;
      let href = RegExp.$2;
      if (href.indexOf("javascript:") === 0) {
        href = href.slice(11);
      } else if (href.indexOf("file:") === 0) {
        // OK
      } else if (href.indexOf("/") === 0) {
        // OK
      } else if (/^[-a-z]+:/.test(href)) {
        // OK
      } else {
        href = `http://${href}`;
      }

      if (options.maxLinkLength) {
        linkText = shortenLink(linkText, options.maxLinkLength);
      }

      hasTextPart = false;
      parts.push({
        type: LINK_PART,
        linkType: "markdown",
        text: linkText,
        href,
        raw: text,
      });
    } else if (/^([-a-z]+):\/\/\S*$/i.test(text) ||
               /^www\.\S+\.\S+$/i.test(text) ||
               /^[^\s"<>#%(){}|\\^~[\]`]+\.(?:com|org|edu|gov|uk|net|ca|de|jp|fr|au|us|ru|ch|it|nl|se|no|es|mil)(?:\/\S*)?$/i.test(text)) {
      let href = text;

      const leadingPunctuation = [];
      while (href.length > 0 && /[(]/.test(href[0])) {
        leadingPunctuation.push(href[0]);
        href = href.slice(1);
      }

      const trailingPunctuation = [];
      while (href.length > 0 && /[.,)]/.test(href[href.length - 1])) {
        trailingPunctuation.push(href[href.length - 1]);
        href = href.slice(0, -1);
      }

      // Grab the text after removing leading/trailing punctuation and before
      // making a link out of it.
      let linkText = href;

      if (href.indexOf("javascript:") === 0) {
        href = href.slice(11);
      } else if (href.indexOf("file:") === 0) {
        // OK
      } else if (href.indexOf("/") === 0) {
        // OK
      } else if (/^[-a-z]+:/i.test(href)) {
        // OK
      } else {
        href = `http://${href}`;
      }

      if (options.maxLinkLength) {
        linkText = shortenLink(linkText, options.maxLinkLength);
      }

      if (leadingPunctuation.length > 0) {
        const leadingText = leadingPunctuation.join("");

        // Put on previous text part if possible.
        if (parts.length > 0 && parts[parts.length - 1].type === TEXT_PART) {
          parts[parts.length - 1].text += leadingText;
        } else {
          parts.push({
            type: TEXT_PART,
            text: leadingText,
          });
        }
      }

      const additionalSetter = { };
      if (isDeepLink(href)) {
        additionalSetter.deepLink = true;
        if (/#t=(.+)$/.test(href)) {
          additionalSetter.taskId = RegExp.$1;
        } else if (/#p=(.+)$/.test(href)) {
          additionalSetter.projectId = RegExp.$1;
        }
      }

      hasTextPart = false;
      parts.push({
        type: LINK_PART,
        linkType: "raw",
        text: linkText,
        href,
        raw: linkText,
        ...additionalSetter,
      });

      if (trailingPunctuation.length > 0) {
        trailingPunctuation.reverse();
        const trailingText = trailingPunctuation.join("");

        hasTextPart = true;
        parts.push({
          type: TEXT_PART,
          text: trailingText,
        });
      }
    } else {
      if (hasTextPart) {
        parts[parts.length - 1].text += text;
      } else {
        hasTextPart = true;
        parts.push({
          type: TEXT_PART,
          text,
        });
      }
    }
  }

  return parts;
}

export function extractText(title) {
  let res = "";
  const parts = scanText(title);
  for (const part of parts) {
    res += part.text;
  }

  return res;
}

// Simple deeplink detection.
function isDeepLink(url) {
  return url.indexOf("amazingmarvin.com") !== -1 && (url.indexOf("#t=") !== -1 || url.indexOf("#p=") !== -1);
}

function shortenLink(link, maxLength) {
  if (!link) {
    return "";
  }

  if (link.length < maxLength) {
    return link;
  }

  let cleanLink;
  try {
    const u = new URL(link);
    const parts = [];

    if (u.protocol !== "http:" && u.protocol !== "https:") {
      parts.push(u.protocol);
      if (link.slice(u.protocol.length, 2 + u.protocol.length) === "//") {
        parts.push("//");
      }
    }

    // TODO: consider suppressing query part

    parts.push(u.host);
    if (u.pathname !== "/") {
      parts.push(u.pathname);
    }

    cleanLink = parts.join("");
  } catch (err) {
    cleanLink = link;
  }

  return shorten(cleanLink, maxLength);
}

