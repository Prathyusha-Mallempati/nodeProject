// This is common file for handling pagination, filtering, sorting and search for all 


const buildQuery = (queryParams) => {
    const { page = 1, limit = 10, search, sortField, sortOrder } = queryParams;
    const filter = {};

    if (search && search.trim().length > 0) {
        const cleanSearch = search.replace(/^"|"$/g, ''); // remove surrounding quotes if present
        console.log('CLEAN SEARCH', cleanSearch)
        filter.$or = [
            { name: { $regex: cleanSearch, $options: 'i' } },   // case-insensitive
            { email: { $regex: cleanSearch, $options: 'i' } }
        ];
    }

    const options = {
        skip: (page - 1) * limit,
        limit: parseInt(limit),
        sort: sortField ? { [sortField]: sortOrder === 'desc' ? -1 : 1 } : {}
    };

    console.log('Filter', filter);
    console.log('Options', options)

    return { filter, options };
}

module.exports = { buildQuery };
