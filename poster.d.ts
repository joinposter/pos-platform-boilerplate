export {};

declare global {
    type Flag = 0 | 1;

    namespace PosterPOS {
        namespace Interface {
            interface PopupArgs {
                width: number;
                height: number;
                title: string;
            }

            interface ShowApplicationIconAtArgs {
                functions?: string;
                order?: string;
                receiptsArchive?: string;
                payment?: string;
            }

            interface ShowNotificationArgs {
                title: string;
                message: string;
                icon: string;
                waiter?: number;
            }

            interface Notification {
                id: number;
                date: number;
                title: string;
                message: string;
                icon: string;
                status: NotificationStatus;
                waiter: number;
            }

            export enum NotificationStatus {
                Unseen = 0,
                DisplayedUnseen = 1,
                Seen = 2,
            }

            interface Methods {
                popup(args: PopupArgs): void,

                closePopup(): void,

                showApplicationIconAt(args: ShowApplicationIconAtArgs): void

                scanBarcode(): Promise<string>,

                showNotification(args: ShowNotificationArgs): Promise<Notification>
            }
        }
        namespace Request {
            interface MakeRequestOptions {
                headers?: Record<string, string>;
                method?: 'get' | 'post' | 'put' | 'delete';
                data?: Record<string, any>;
                timeout?: number;
            }

            interface Response {
                result: Record<string, any> | string | false,
                code: number
            }

            type MakeRequestCallback = (answer: Response) => void;

            interface Methods {
                makeRequest(url: string, options: MakeRequestOptions, callback: MakeRequestCallback): void;

                // @todo: implement available methods enum
                makeApiRequest(method: string, data: Record<string, any>, callback: (...args: any[]) => any): void;
            }
        }
        namespace Client {
            export enum LoyaltyType {
                Points = 1,
                Discount = 2,
            }

            export enum Gender {
                Male = 1,
                Female = 2,
            }

            interface Model {
                id: number;
                address: string;
                bonus: number;
                cardNumber: string;
                city: string;
                comment: string;
                discount: number;
                firstname: string;
                lastname: string
                groupId: number;
                hidden: Flag;
                loyaltyType: LoyaltyType;
                phone: string;
                totalPayedSum: number;
                birthday: string;
                email: string;
            }

            interface WriteModel {
                client_name: string;
                client_groups_id_client: number;
                client_sex?: Gender;
                country_phone_code?: number;
                phone?: string;
                email?: string;
                card_number?: string;
                city?: string;
                address?: string;
                country?: string;
                comment?: string;
                birthday?: string;
            }

            interface CreateArgs {
                client: WriteModel;
            }

            interface FindArgs {
                searchVal: string;
            }

            interface FindResult {
                foundClients: Model[];
                foundByCard: Model[];
            }

            interface Methods {
                get(clientId: number): Promise<Model | null>;

                create(createArgs: CreateArgs): Promise<Model | null>;

                find(findArgs: FindArgs): Promise<FindResult>
            }
        }
        namespace User {
            interface Model {
                id: number;
                posPass: number;
                name: string;
                admin: boolean;
                delete: Flag;
            }

            interface Methods {
                get(userId: number): Promise<Model | null>

                getActiveUser(): Promise<Model>
            }
        }
        namespace Tax {
            export enum Type {
                Untaxed = 0,
                VAT = 1,
                Turnover = 2,
            }
        }
        namespace Order {
            export enum Status {
                Open = 1,
                Closed = 2,
            }

            export enum PaymentMethod {
                Cash = 1,
                Card = 2,
            }

            export enum Type {
                DineIn = 1,
                TakeAway = 2,
                Delivery = 3,
            }

            interface DeliveryInfo {
                uuid: string;
                paymentMethodId: PaymentMethod,
                deliveryZoneId: number;
                deliveryPrice: number;
                billAmount: number;
                courierId: number;
                city: string;
                address1: string;
                address2: string;
                comment: string;
                zipCode: string;
                deliveryTime: number;
                lat: number;
                lng: number;
                country: string;
            }

            interface Product extends Product.Model {
                count: number;
                id: number;
                modification: number | string;
                promotionId: number;
                price: number;
                promotionPrice: number;
                printedNum: number;
                taxFiscal: Flag;
                extras: Record<string, any>
            }

            interface Model {
                id: number;
                clientId: number;
                userId: number;
                comment: string;
                dateClose: number;
                datePrint: number;
                dateStart: number;
                discount: number;
                guestsCount: number;
                loyaltyAppId: number;
                orderName: string;
                parentId: number;
                payType: 'close' | 'mix';
                payedBonus: number;
                payedCard: number;
                payedCash: number;
                payedThirdParty: number;
                payedSum: number;
                products: Product[],
                status: Status,
                subtotal: number;
                total: number;
                tableId: number;
                tipIncluded: boolean;
                tipSum: number;
                serviceMode: Type;
                deliveryInfo: DeliveryInfo;
                extras: Record<string, any>;
            }

            interface AddProductOptions {
                id: number;
                modification?: number | string;
            }

            interface ChangeProductCountOptions extends AddProductOptions {
                count: number;
            }

            interface CloseOrderOptions {
                payment: {
                    cash: number,
                    card: number
                }
            }

            interface Methods {
                create(): Promise<Model>;

                getActive(): Promise<Model | null>;

                setOrderBonus(orderId: number, percentage: number): void;

                setOrderClient(orderId: number, clientId: number): Promise<{ success: boolean }>;

                setOrderComment(orderId: number, comment: string): void;

                printReceipt(orderId: number, qrCodeData: string, qrCodeTitle: string): void;

                setPrintText(orderId: number, text: string): Promise<{ success: boolean }>;

                addProduct(orderId: number, options: AddProductOptions): Promise<Model>;

                changeProductCount(orderId: number, options: ChangeProductCountOptions): Promise<Model>;

                closeOrder(orderId: number, options: CloseOrderOptions): Promise<{ result?: string, error?: string }>

                setExtras(orderId: number, key: string, value: string): Promise<{ success: boolean }>;
            }
        }
        namespace IncomingOrder {
            export enum Type {
                OnlineOrder = 1,
                Booking = 2,
            }

            interface Payment {
                type: Flag;
                incomingOrderId: number;
                sum: number;
                currency: string;
                createdAt: number;
            }

            interface Client extends Client.Model {
                clientGroupId?: number;
            }

            interface Model {
                id: number;
                clientId: number;
                comment: string;
                guestsCount: number;
                type: Type;
                sum: number;
                tableId: number;
                products: Order.Product[];
                payments?: Payment;
                client?: Client;
            }
        }

        namespace Product {
            interface Model {
                id: number
                delete: Flag;
                hidden: Flag;
                fiscal: Flag;
                fiscalProgram: number;
                nodiscount: Flag;
                parent: number;
                sortOrder: number;
                weightFlag: Flag;
                workshop: number;
                price: number;
                cookingTime: number;
                barcode: string;
                picture: string;
                color: string;
                taxId: Flag;
                taxType: Tax.Type;
                taxValue: number;
                taxName: string;
            }

            interface GetFullNameArgs {
                id: number;
                modification: number;
            }

            interface GetFullNameResponse extends GetFullNameArgs {
                name: string,
                modGroupName: string,
            }

            interface Methods {
                get(id: number): Promise<Model>;

                get(idOrIds: number[]): Promise<Model[]>;

                getFullName(args: GetFullNameArgs): Promise<GetFullNameResponse>;
            }
        }

        namespace FiscalEvent {
            interface Product {
                product_id: number;
                modification_id: number;
                promotion_id: number;
                count: number;
            }

            interface Result {
                order: Order.Model,
                userId: number,
            }

            interface Success extends Result {
                products: Product[]
            }

            interface Error extends Result {
                errorCode: string,
                errorText: string,
            }
        }

        namespace CashShift {
            interface Model {
                cash_pos_id: number;
                cash_shift_id: number;
                timestart: number;
                timeend: number;
                amount_start: number;
                amount_end: number;
                comment: string;
            }
        }

        namespace Workshop {
            interface Model {
                id: number;
                name: string;
                printTickets: Flag;
            }
        }

        interface Settings {
            clientNumber: number;
            accountUrl: string;
            applicationId: number;
            applicationName: string;
            country: string;
            currencyCodeIso: string;
            currency: string;
            currencySymbol: string;
            lang: 'ru' | 'ua' | 'en' | 'pl';
            spotId: number;
            spotTabletId: number;
            subnetMask: string;
            timezone: string;
            extras: Record<string, any>;
            spotExtras: Record<string, any>;
            spotTabletExtras: Record<string, any>;
            usesTables: boolean;
            workshops: Workshop.Model[];
        }

        interface Environment {
            android: boolean,
            iOS: boolean,
            windows: boolean,
            desktop: boolean,
        }

        interface API extends Request.Methods {
            interface: Interface.Methods;
            client: Client.Methods;
            user: User.Methods;
            orders: Order.Methods;
            settings: Settings;
            environment: Environment;

            on(event: string, callback: (...args: any[]) => void): void;

            on(event: 'orderOpen', callback: (order: Order.Model) => void): void;

            on(
                event: 'orderProductChange',
                callback: (
                    info: {
                        order: Order.Model,
                        product: Pick<Order.Product, 'id' | 'modification' | 'count'>
                    }
                ) => void
            ): void;

            on(event: 'orderClientChange', callback: (data: { clientId: number, orderId: number }) => void): void;

            on(event: 'beforeOrderClose', callback: (data: Order.Model, next: (payButton: string) => any) => void): void;

            on(event: 'afterOrderClose', callback: (data: Order.Model) => void): void;

            on(event: 'incomingOrderCreated', callback: (data: Order.Model) => void): void;

            on(event: 'applicationIconClicked', callback: (data: { place: string, order: Order.Model }) => void): void;

            on(event: 'afterPopupClosed', callback: () => void): void;


            on(event: 'notificationClick', callback: (notification: Interface.Notification) => void): void;

            on(event: 'userLogin', callback: (res: User.Model) => void): void;

            on(event: 'userLogout', callback: (res: User.Model, next: () => void) => void): void;

            on(event: 'printFiscal', callback: (res: FiscalEvent.Success) => void): void;

            on(event: 'failedPrintFiscal', callback: (res: FiscalEvent.Error) => void): void;

            on(event: 'returnFiscal', callback: (res: FiscalEvent.Success) => void): void;

            on(event: 'failedReturnFiscal', callback: (res: FiscalEvent.Error) => void): void;

            on(event: 'shiftOpen', callback: (data: CashShift.Model) => void): void;

            on(event: 'shiftClose', callback: (data: CashShift.Model) => void): void;
        }
    }

    const Poster: Readonly<PosterPOS.API>;
}
