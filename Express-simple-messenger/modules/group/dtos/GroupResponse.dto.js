export class GroupResponseDto {
    constructor(group) {
        this.id = group.id;
        this.name = group.name;
        this.description = group.description;
    }

}