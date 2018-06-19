export class API {

	public static get getAllCategories() : string {
		return "http://localhost/store/web/index.php?r=categories/get";
	}

	public static get getItemsFromCategory() : string {
		return "http://localhost/store/web/index.php?r=items/get&categoryId=";
	}
	public static get makeorder() : string {
		return "http://localhost/store/web/index.php?r=cart/makeorder";
	}
	public static get login() : string {
		return "http://localhost/store/web/index.php?r=auth/login&as=";
	}
	public static get reg() : string {
		return "http://localhost/store/web/index.php?r=auth/reg";
	}

	public static get AddCategory() : string {
		return "http://localhost/store/web/index.php?r=categories/add";
	}
	public static get DeleteCategory() : string {
		return "http://localhost/store/web/index.php?r=categories/delete&id=";
	}
}