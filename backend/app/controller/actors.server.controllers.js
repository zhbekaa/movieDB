const actors = require("../model/actor.server.models");

const getActor = async (req, res) => {
    const id = req.params.id;

    try {
        const actor = await actors.getSingleActor(id);
        return res.status(200).send(actor)
    } catch {
        return res.status(404)
    }
    
}
module.exports = {
    getActor: getActor
}
