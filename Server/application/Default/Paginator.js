
class Paginator{
    static getPagination(model, currPage, limitPage, callback){
        model.count()
            .then((count)=>{
                let totalPage = Math.ceil(count / limitPage) - 1;

                if(totalPage < 0) totalPage = 1;
                if(currPage > totalPage) currPage = totalPage;

                callback({
                    currPage: currPage,
                    limitPage: limitPage,
                    totalPage: totalPage
                });
            });
    }
}

module.exports = Paginator;