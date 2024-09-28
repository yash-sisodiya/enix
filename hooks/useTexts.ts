import translation from '@/translation/translation';

export const useTexts = () => {
  const texts = {
    errors: {
      networkDownTitle: translation.t('errors.networkDownTitle'),
      networkDownDesc: translation.t('errors.networkDownDesc'),
    },
  };
  return texts;
};
