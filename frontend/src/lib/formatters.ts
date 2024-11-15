import * as React from 'react';

export const formatFieldName = (field: string): string => {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

export const parseItalics = (text: string): React.JSX.Element => {
  const parts = text.split(/(<i>|<\/i>|<sub>|<\/sub>)/);
  let isItalic = false;
  let isSub = false;
  
  let currentString = '';
  
  parts.forEach((part) => {
    if (part === '<i>') {
      isItalic = true;
    } else if (part === '</i>') {
      isItalic = false;
    } else if (part === '<sub>') {
      isSub = true;
    } else if (part === '</sub>') {
      isSub = false;
    } else {
      if (isItalic) {
        currentString += `<i>${part}</i>`; // Wrap italic text
      } else if (isSub) {
        currentString += `<sub>• ${part}</sub>`; // Wrap subscript text
      } else {
        currentString += part; // Accumulate non-italic text
      }
    }
  });
  return React.createElement('span', { 
    dangerouslySetInnerHTML: { __html: currentString } 
  }) as React.JSX.Element;
};

export const formatRules = (rules: string[]): { type: 'regular' | 'bullet' | 'number'; text: string; }[] => {
  return rules.map(rule => {
    if (rule.startsWith('- ')) {
      return {
        type: 'bullet',
        text: rule.substring(2).trim()
      };
    } else if (/^\d+\.\s/.test(rule)) {
      return {
        type: 'number',
        text: rule.replace(/^\d+\.\s/, '').trim()
      };
    } else {
      return {
        type: 'regular',
        text: rule
      };
    }
  });
};

export const groupRules = (rules: { type: 'regular' | 'bullet' | 'number'; text: string; }[]): { type: 'regular' | 'bullet' | 'number'; items: string[]; }[] => {
  const groups: { type: 'regular' | 'bullet' | 'number'; items: string[]; }[] = [];
  let currentGroup: { type: 'regular' | 'bullet' | 'number'; items: string[]; } | null = null;

  rules.forEach(rule => {
    if (!currentGroup || currentGroup.type !== rule.type) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      currentGroup = { type: rule.type, items: [rule.text] };
    } else {
      currentGroup.items.push(rule.text);
    }
  });

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
}; 