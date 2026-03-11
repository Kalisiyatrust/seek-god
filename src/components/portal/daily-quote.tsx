'use client';

import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  { text: 'The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.', author: 'Ralph Waldo Emerson' },
  { text: 'He who has a why to live can bear almost any how.', author: 'Viktor Frankl' },
  { text: 'The two most important days in your life are the day you are born and the day you find out why.', author: 'Mark Twain' },
  { text: 'Your work is to discover your world and then with all your heart give yourself to it.', author: 'Buddha' },
  { text: 'The meaning of life is to find your gift. The purpose of life is to give it away.', author: 'Pablo Picasso' },
  { text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', author: 'Jeremiah 29:11' },
  { text: 'Not all of us can do great things. But we can do small things with great love.', author: 'Mother Teresa' },
];

export function DailyQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Pick a quote based on day of year so it's consistent for the day
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setQuoteIndex(dayOfYear % quotes.length);
  }, []);

  const quote = quotes[quoteIndex];

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-gold-50 to-warm-50 border border-primary/10 p-6">
      <div className="absolute top-3 right-4 opacity-10">
        <Quote className="w-16 h-16 text-primary" />
      </div>
      <div className="relative">
        <p className="text-lg font-display italic leading-relaxed text-foreground/90 mb-3">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="text-sm font-medium text-primary">— {quote.author}</p>
      </div>
    </div>
  );
}
