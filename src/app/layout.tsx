'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { Provider } from 'mobx-react'; 
import todoStore from '../../stores/TodoStore'; 
import './globals.css'; 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider todoStore={todoStore}>
          {children} 
        </Provider>
      </body>
    </html>
  );
}
