const dateParser = (req, res, next) => {
    if (req.body.date) {
        try {
            req.body.date = new Date(req.body.date);
            if (isNaN(req.body.date.getTime())) {
                return res.status(400).json({ error: "Invalid date format" });
            }
        } catch (error) {
            return res.status(400).json({ error: "Error parsing date" });
        }
    }
    next();
};

export default dateParser;