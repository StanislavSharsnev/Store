export class Order {
	public name: string;
	public email: string;
	public date: string;
	public totalprice: number;
	public items: OrderItem[];
}
export class OrderItem {
	public name: string;
	public count: number;
	public price: number;
}