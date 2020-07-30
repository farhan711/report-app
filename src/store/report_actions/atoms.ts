import { atom } from 'recoil'

type SendTypeAtomType = {
    key: string,
    default: "now" | "scheduled" | "download" | undefined
}


export const sendTypeAtom: SendTypeAtomType = atom({
    key: 'sendTypeAtom',
    default: undefined
})

export const isSendingAtom = atom({
    key: 'isSendingAtom',
    default: false
})

export const ReportTypeAtom = atom({
    key: 'reportTypeAtom',
    default: undefined
})

export const timeAtom = atom({
    key: 'timeAtom',
    default: undefined
})

export const intervalAtom = atom({
    key: 'intervalAtom',
    default: undefined
})
