import fs from 'fs'

export const htmlSendNotify = ({usuario, producto}) => {
    const emailStop = fs.readFileSync("./message/message.html", "utf8");
    const emailSend = emailStop.replace(/@userName/g, usuario.nombre).replace(/@productName/g, producto.nombre).replace(/@productUrl/g, producto.url).replace(/@apellido/g, usuario.apellido)
    return emailSend
}
