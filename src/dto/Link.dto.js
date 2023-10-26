export default class LinkDTO {
    static getLinkInputFrom = (link) =>{
        return {
            user : link.user,
            codelink: link.codelink
        }
    }
}