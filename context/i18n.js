import { useRouter } from 'next/router'
import { createContext, useCallback, useContext } from 'react'

import es from '../translations/es.json'
import en from '../translations/en.json'

const I18NContext = createContext()

const languages = { es, en }

export function I18NProvider({ children }) {
  const { locale } = useRouter()

  const t = useCallback(
    (key) => {
      return languages[locale][key]
    },
    [locale]
  )

  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>
}

export function useI18N() {
  const context = useContext(I18NContext)

  if (context === undefined) {
    throw new Error('useI18n must be used within an I18NProvider')
  }

  return context
}