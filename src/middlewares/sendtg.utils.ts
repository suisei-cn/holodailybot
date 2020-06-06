export function giveInlineVoice(audio: String, text: String): Object {
    return {
        type: "voice",
        id: String(Math.random()),
        voice_file_id: audio,
        title: "告诉我吧！今天的幸运 VTuber",
        caption: text
    };
}

export function giveInlineArticle(text: String): Object {
    return {
        type: "article",
        id: String(Math.random()),
        title: "告诉我吧！今天的幸运 VTuber",
        input_message_content: {
            message_text: text,
            parse_mode: "HTML"
        }
    }
}