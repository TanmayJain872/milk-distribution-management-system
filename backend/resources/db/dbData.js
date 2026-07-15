/* jshint esversion: 11 */

export const dbData = {
    databaseName: "QuickChat",
    tables: {
        Customer: {
            tableName: "customer",
            fields: {
                id: "id",
                externalCustomerId: "externalCustomerId",
                name: "name",
                password: "password",
                phoneNumber: "phoneNumber",
                emailId: "emailId",
                status: "status",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        Address: {
            tableName: "address",
            fields: {
                id: "id",
                customerId: "customerId",
                address: "address",
                landmark: "landmark",
                pincode: "pincode",
                phoneNumber: "phoneNumber",
                status: "status",
                isPrimary: "isPrimary",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        Product: {
            tableName: "product",
            fields: {
                id: "id",
                externalProductId: "externalProductId",
                name: "name",
                measurementUnit: "measurementUnit",
                totalQuantity: "totalQuantity",
                price: "price",
                status: "status",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        Stock: {
            tableName: "stock",
            fields: {
                id: "id",
                externalStockId: "externalStockId",
                productId: "productId",
                quantity: "quantity",
                status: "status",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        Cart: {
            tableName: "cart",
            fields: {
                id: "id",
                externalCartId: "externalCartId",
                customerId: "customerId",
                status: "status",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        CartItem: {
            tableName: "cartitem",
            fields: {
                id: "id",
                cartId: "cartId",
                productId: "productId",
                unitSpecification: "unitSpecification",
                quantity: "quantity",
                status: "status",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        Delivery: {
            tableName: "delivery",
            fields: {
                id: "id",
                externalDeliveryId: "externalDeliveryId",
                customerId: "customerId",
                cartId: "cartId",
                deliveryAgentId: "deliveryAgentId",
                vendorId: "vendorId",
                totalAmount: "totalAmount",
                deliveryStatus: "deliveryStatus",
                paymentStatus: "paymentStatus",
                paymentMode: "paymentMode",
                refundMode: "refundMode",
                cancellationReason: "cancellationReason",
                status: "status",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        DeliveryAgent: {
            tableName: "deliveryagent",
            fields: {
                id: "id",
                externalAgentId: "externalAgentId",
                name: "name",
                phoneNumber: "phoneNumber",
                password: "password",
                status: "status",
                createdBy: "createdBy",
                updatedBy: "updatedBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        Collection: {
            tableName: "Collection",
            fields: {
                id: "id",
                ownerId: "ownerId",
                name: "name",
                createdBy: "createdBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        BookmarkCollection: {
            tableName: "BookmarkCollection",
            fields: {
                id: "id",
                bookmarkId: "bookmarkId",
                collectionId: "collectionId",
                status: "status",
                createdBy: "createdBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        },
        PostCollection: {
            tableName: "PostCollection",
            fields: {
                id: "id",
                postId: "postId",
                collectionId: "collectionId",
                status: "status",
                createdBy: "createdBy",
                createdAt: "createdAt",
                updatedAt: "updatedAt"
            }
        }
    }   
};