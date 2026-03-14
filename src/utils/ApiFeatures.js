class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // فلتر
    filter() {
        const queryObj = {};
        
        // Handle flat bracket notation (e.g., from Vercel's query parser)
        for (const [key, value] of Object.entries(this.queryString)) {
            const match = key.match(/^([^\[]+)\[([^\]]+)\]$/);
            if (match) {
                const field = match[1];
                const op = match[2];
                if (!queryObj[field]) queryObj[field] = {};
                queryObj[field][op] = value;
            } else {
                queryObj[key] = value;
            }
        }

        const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
        excludedFields.forEach(field => delete queryObj[field]);

        // gte, gt, lte, lt
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // سيرش
    search(field = 'name') {
        if (this.queryString.search) {
            this.query = this.query.find({
                [field]: { $regex: this.queryString.search, $options: 'i' }
            });
        }
        return this;
    }

    // سورت
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    // تحديد الفيلدز
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        return this;
    }

    // باجينيشن
    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        this.page = page;
        this.limit = limit;
        return this;
    }
}

module.exports = ApiFeatures;