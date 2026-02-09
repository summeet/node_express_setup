const mongoose = require("mongoose")
const ReviewSchema = require("./review.schema")

const ItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const StatusHistorySchema = new mongoose.Schema({
    status: {
      type: String,
      enum: [
        "active",       // order created
        "processing",   // preparing / picking
        "shipped",      // out for delivery / courier assigned
        "in-transit",   // shipped but not yet delivered
        "delivered",    // delivered to customer
        "completed",    // order finished
        "cancelled",    // cancelled by user/admin
        "returned"      // returned by customer
      ],
      required: true
    },
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: String, enum: ["system", "admin", "courier", "user"], default: "system" }
  },
  { _id: false } // no separate _id needed for sub-documents
)



const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deliveryAddress: { type: Object, required: true },
    items: [ItemSchema],
    paymentMethod: { type: String, enum: ["cod", "card", "upi", "wallet"], required: true },
    pricing: {
        subtotal: Number,
        discount: Number,
        tax: Number,
        deliveryFee: Number,
        total: Number
    },
    payment: {
        status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        transactionId: String,
        gateway: String
      },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active"
      },
    orderNumber: { type: String, unique: true, required: true },
    tracking: {
        courier: String,
        trackingNumber: String,
        status: {
            type: String,
            enum: ["pending", "shipped", "delivered"],
            default: "pending"
        },
        expectedDeliveryDate: Date,
        lastUpdated: { type: Date, default: Date.now }
    },
    statusHistory: [StatusHistorySchema],
    reviews: [ReviewSchema]
}, { timestamps: true })

module.exports = orderSchema
