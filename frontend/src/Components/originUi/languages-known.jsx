'use client';
// Add the following to tailwind.config.ts: "./node_modules/emblor/dist/index.mjs",

import { TagInput } from 'emblor';
import { useId, useState } from 'react';

export default function Languages({ placeholder, tags = [], setTags = () => {} }) {
  const id = useId();
  const [activeTagIndex, setActiveTagIndex] = useState(null);

  return (
    <div className="space-y-2">
      <TagInput
        id={id}
        name="info"
        tags={tags}
        setTags={setTags}
        placeholder={placeholder}
        required
        styleClasses={{
          inlineTagsContainer:
            'border-input rounded-lg bg-zinc-800 shadow-none transition-shadow focus-within:border p-1 gap-1',
          input: 'w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7',
          tag: {
            body: 'h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7',
            closeButton:
              'absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground'
          }
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
    </div>
  );
}
