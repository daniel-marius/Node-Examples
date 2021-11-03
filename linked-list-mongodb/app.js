const MongoClient = require("mongodb").MongoClient;

class LinkedList {
	constructor() {}

	async init() {
		const URI = "";
		this.client = new MongoClient(URI, { useNewUrlParser: true });
		try {
			await this.client.connect();
			console.log("Connected to MongoDB Atlas!");
			this.collection = this.client.db("demos").collection("linked-lost");
			console.log("Collection: ", this.collection);
		} catch (err) {
			console.error(err.stack);
		}
	}

	async resetAtlasData() {
		await this.collection.deleteMany({ value: { $exists: true } });
	}

	async resetMeta() {
		await this.collection.updateOne(
			{ meta: true },
			{ $set: { head: null, tail: null }},
			{ upsert: true }
		);
	}

	async createNewNode(data) {
		const newNode = await this.collection.insertOne(
			{ value, next: null }
		);

		return newNode;
	}

	async getMeta() {
		const meta = await this.collection.find({ meta: true }).next();
		return meta;
	}

	async getHead() {
		const meta = await this.getMeta();
		return meta.head;
	}

	async getTail() {
		const meta = await this.getMeta();
		return meta.head;
	}

	async setHead(newNodeID) {
		await this.collection.updateOne(
			{ meta: true },
			{ $set: { head: newNodeID }}
		);
	}

	async setTail(newNodeID) {
		await this.collection.updateOne(
			{ meta: true },
			{ $set: { tail: newNodeID }}
		);
	}

	async add(value) {
		// Add a new node to the current tail
		const newNode = await this.createNewNode(value);
		const newNodeID = newNode.insertedId;
		const head = await this.getHead();
		// Add a node to an empty linked list
		if (head === null) {
			this.setHead(newNodeID);
			
		} else {
			// Add a node to a non empty linked list
			const tailID = await this.getTail();
			await this.collection.updateOne(
				{ id: tailID }, 
				{ $set: { next: newNodeID } }
			);
		}

		this.setTail(newNodeID);
	}

	async getItem(index) {
		if (index <= -1) {
			throw new Error("Invalid index");
		}

		const head = await this.getHead();
		let position = 0;
		let currentNode = this.collection.find({ _id: head }).next(); 
	
		// Loop through the nodes till we reach the index
		while (position < index) {
			if (currentNode.next === null ) {
				throw new Error("Index overflow");
			}
			currentNode = this.collection.find({ _id: currentNode.next }).next(); 
			position += 1;
		}
		return currentNode;
	}
}

// Immediately invoked function expression
(async function() {
	try {
		const linkedList = new LinkedList();
		await linkedList.init();
		await linkedList.resetAtlasData();
		await linkedList.resetMeta();
		await linkedList.add("First node");
		await linkedList.add("Second node");
		await linkedList.add("Third node");
		console.log(await linkedList.getItem(1));
	} catch (err) {
		console.log(err.stack);
	}
})();