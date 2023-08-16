// calling login endpoint
export function callLogin(username, password, callback)
{
    setTimeout(()=>{
        if(username === 'test' && password==='test')
        {
            return callback(null);
        }
        else
        {
            return callback(new Error('Invalid username or password'))
        }
    },1000);
}