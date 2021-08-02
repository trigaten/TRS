function LLTest(){
    let ll = new LinkedList();
    let n = new Node("Sander", "J", "K", 44);
    ll.push(n);
    let n2 = new Node("Sander2222", "J", "K", 45);
    ll.push(n2);
    Logger.log(ll.pop().score);
  }