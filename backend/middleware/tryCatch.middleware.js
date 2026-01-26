

const tryCatch = (handler)=>{
    return async () => {
        try {
           await handler();
        } catch (error) {
            console.error(error);
            
        }
    }
}
const value = tryCatch(
    async () => {
        console.log("i cam here");
        throw new Error("these is the error");
    }
)
value();
debugger
console.log(value);
console.log(typeof value);
console.log(handler);
console.log(typeof handler);
// next i need to try with arguments and also i need to do trycatch with actual handler
// still learning 