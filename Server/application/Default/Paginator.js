
class Paginator{
    static getPagination(model, filter, currPage, limitPage, callback){
        model.count({where: filter})
            .then((count)=>{
                let totalPage = Math.ceil(count / limitPage);

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