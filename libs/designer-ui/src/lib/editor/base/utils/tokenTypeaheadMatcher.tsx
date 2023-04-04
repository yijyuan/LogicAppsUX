import type { QueryMatch } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import type { LexicalEditor } from 'lexical';
import { useCallback } from 'react';

export type TriggerFn = (text: string, editor: LexicalEditor) => QueryMatch | null;
export const PUNCTUATION = '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
export function useTokenTypeaheadTriggerMatch(
  trigger: string,
  { minLength = 1, maxLength = 75 }: { minLength?: number; maxLength?: number }
): TriggerFn {
  return useCallback(
    (text: string) => {
      const validChars = '[^' + trigger + PUNCTUATION + '\\s]';
      const TypeaheadTriggerRegex = new RegExp('(' + '[' + trigger + ']' + '((?:' + validChars + '){0,' + maxLength + '})' + ')$');
      console.log(TypeaheadTriggerRegex);
      const match = TypeaheadTriggerRegex.exec(text);
      if (match !== null) {
        const maybeLeadingWhitespace = match[1];
        const matchingString = match[2];
        if (matchingString.length >= minLength) {
          return {
            leadOffset: match.index + maybeLeadingWhitespace.length,
            matchingString,
            replaceableString: match[1],
          };
        }
      }
      return null;
    },
    [maxLength, minLength, trigger]
  );
}
