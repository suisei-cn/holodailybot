export type ItemPickText = string;
type ItemPickAudio = {
    type: 'voice',
    payload: string,
    extra: string
};

type ItemPickURLImage = {
    type: 'urlimage',
    payload: string
};

export type ItemPick = ItemPickText | ItemPickAudio | ItemPickURLImage;


export type ItemPickList = {
    [key: string]: ItemPick[]
};