const getCountQuery = (startDate, endDate) => {
    return [
        {
            $addFields: {
                "createdAt": {
                $toDate: "$TrialOrder.dateReceived"
                }
            }
        },
        { $match: { createdAt: { $gte : new Date(startDate), $lte: new Date(endDate) } }},
        { $count: "count"},
    ]
}

module.exports = { getCountQuery }