import AbstractModel from '../Default/AbstractModel';

class Paginator{
    static getPagination(model, filter, currPage, limitPage, callback){
        model.count({where: filter})
            .then((count)=>{
                callback(this.calculatePage(count, currPage, limitPage));
            });
    }

    static getPaginationRawQuery(query, currPage, limitPage, callback){
        let abstractModel = new AbstractModel();
        let db = abstractModel.getConnection();

        db.query(query)
            .spread((result, metadata)=>{
                result = JSON.parse(JSON.stringify(result));
                callback(this.calculatePage(result[0].count, currPage, limitPage));
            });
    }

    static calculatePage(count, currPage, limitPage){
        let totalPage = Math.ceil(count / limitPage);

        if(totalPage < 0) totalPage = 1;
        if(currPage > totalPage) currPage = totalPage;

        return {
            currPage: currPage,
            limitPage: limitPage,
            totalPage: totalPage
        };
    }
}

module.exports = Paginator;