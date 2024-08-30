class HistoryController
{
    async index(req, res, next)
    {
        try {
            const orders = await Promise.all([Orders.find({})])

            res.json({
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new HistoryController