
class AvailableController {
    async index (req, res) {
        try {
            return res.json({ok: "ok"});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new AvailableController();