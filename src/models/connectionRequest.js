const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored", "accepted", "rejected", "interested"],
                message: `{VALUE} is incorrect status type`
            }
        }
    },
    {
        timestamps: true
    }
)

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }) //Indexing

connectionRequestSchema.pre("save", function (next) {
    const coneectionRequest = this;
    if (coneectionRequest.fromUserId.equals(coneectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself");
    };
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel