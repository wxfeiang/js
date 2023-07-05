

toSelectFood(index, indexi) {
    const { foodId, flag, foodName, isSelecta, notLikeReason } = this.weekitem[index].voteFood[indexi]
    if (flag == "0") {
        this.weekitem[index].voteFood[indexi].isSelect = !isSelecta
        if (notLikeReason) {
            this.dislike.push({
                indextwo: index,
                foodId,
                flag,
                foodName,
                !isSelect,
                notLikeReason
            })
    }
}
}