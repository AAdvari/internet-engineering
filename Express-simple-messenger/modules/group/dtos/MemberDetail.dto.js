export default class MemberDetailDto {
    constructor(member) {
        this.id = member.id;
        this.name = member.name;
        this.email = member.email;
        this.rule = member.isAdmin ? "Owner" : "Member"
    }
}