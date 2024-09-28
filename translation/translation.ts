import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './en';

const resource = {
  en: en,

  // es: {
  //  translation: es,
  // },
  // fr: {
  //     translation: fr
  // }
};

const translation = new I18n(resource);
translation.locale = Localization.getLocales()[0].languageCode ?? 'en';

export default translation;
