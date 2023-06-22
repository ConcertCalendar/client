export class keyWordStorage {
    private key : string;
    private value : Array<string>; 

    constructor(key : string , value : Array<string>){
        this.key = key;
        this.value = new Array<string>;
    }

    get() { //localstorage에서 키에 해당하는 값을 갖고 오는 함수
        const data = localStorage.getItem(this.key)
        if(data){
            this.value = JSON.parse(data);
        }
        return this.value;
    }

    set(keyword : string) { //localstorage에 저장하는 함수
        const temp = this.get()
        if(temp.length > 4) {
            temp.shift();
        }
        temp.push(keyword);
        localStorage.setItem(this.key , JSON.stringify(temp))
    }

    delete (keyword : string) {
        const temp = this.value.filter((item) => keyword !== item);
        this.value = temp;
        localStorage.setItem(this.key , JSON.stringify(this.value))
    }

    clear () {
        localStorage.removeItem(this.key);
    }
    
}
