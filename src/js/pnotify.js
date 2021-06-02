import { alert, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function onFetchError () {
  alert('Please enter a more specific query');
}

defaults.delay = '3000';
