/**
 * Verse of the Day — a single Sanskrit/transliteration/translation
 * pair, hand-curated from Bhagavad-gita and Srimad Bhagavatam.
 *
 * Rotate by day-of-year. Replace as you add more.
 */
export const verses = [
  {
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana',
    translation: 'You have a right to action alone, never to its fruits.',
    reference: 'Bhagavad-gita 2.47',
  },
  {
    sanskrit: 'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु',
    transliteration: 'man-manā bhava mad-bhakto mad-yājī māṁ namas-kuru',
    translation: 'Always think of Me, become My devotee, worship Me, and offer homage to Me.',
    reference: 'Bhagavad-gita 9.34',
  },
  {
    sanskrit: 'चेतसा सर्वकर्माणि मयि संन्यस्य मत्परः',
    transliteration: 'cetasā sarva-karmāṇi mayi sannyasya mat-paraḥ',
    translation: 'Mentally surrender all your activities to Me, with mind fixed on Me.',
    reference: 'Bhagavad-gita 12.8',
  },
  {
    sanskrit: 'अपि चेत् सुदुराचारो भजते माम् अनन्यभाक्',
    transliteration: 'api cet sudurācāro bhajate mām ananya-bhāk',
    translation: 'Even a person of very bad conduct can cross beyond the ocean of suffering by engaging in My devotion.',
    reference: 'Bhagavad-gita 9.30',
  },
  {
    sanskrit: 'नैषा स्मृता मत्कृते नापितस्य कर्मणो ह्यनिष्ठितं प्रेषितोऽहम्',
    transliteration: 'naiṣā smṛtā mat-kṛte na apitasya karmaṇaḥ hy aniṣṭhitaṁ preṣito aham',
    translation: 'For one who remembers Me, no effort is lost and no obstacle remains.',
    reference: 'Brahma-vaivarta Purana',
  },
  {
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
    transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata',
    translation: 'Whenever dharma declines and adharma rises, I manifest Myself.',
    reference: 'Bhagavad-gita 4.7',
  },
  {
    sanskrit: 'सर्वधर्मान् परित्यज्य मामेकं शरणं व्रज',
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja',
    translation: 'Abandon all varieties of dharma and simply surrender unto Me.',
    reference: 'Bhagavad-gita 18.66',
  },
  {
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
    transliteration: 'hare kṛṣṇa hare kṛṣṇa kṛṣṇa kṛṣṇa hare hare',
    translation: 'Chant the holy names of the Lord — the maha-mantra for this age.',
    reference: 'Kali-santarana Upanishad',
  },
];

export function todaysVerse(at = new Date()) {
  const start = new Date(at.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((at - start) / 86_400_000);
  return verses[dayOfYear % verses.length];
}