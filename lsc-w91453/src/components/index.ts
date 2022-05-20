const max = 7;

export function pagination () {
   const pagelist =  (curr: number, total: number) => {
        let list = [];
        if(total < max) {
            for(var r = 1; r < total + 1; r++) {
                list.push(r);
            }
        } else {
            if(curr < 4) { 
                list = [1,2,3,4,'...',total];
            } else {
                if(curr > total - 3) {
                    list = [1, '...', total-3,total-2,total-1,total];
                } else {
                    list = [1,'...',curr-1, curr, curr+1,'...',total];
                }
            }
        }
        return list;
    }
    return {
        pagelist
    }
}