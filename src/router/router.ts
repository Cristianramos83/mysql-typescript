import {Router,Request,Response} from 'express';
import MySql from '../mysql/mysql';

const router=Router();
router.get('/',(req:Request,res:Response)=>{
    res.json({
        ok:true,
        mensaje:'Todo esta bien'
    });
});

router.get('/heroes',(req:Request,res:Response)=>{ 

    const query=`
    SELECT * FROM heroes
    `;

       MySql.ejecutarQuery(query,(err:any, heroes:Object[])=>{
                if(err){
                    res.status(400).json({
                        ok:false,
                        error:err
                    })
                }else{
                    res.json({
                        ok:true,
                        heroes:heroes
                    })
                }
       })
       
});
router.get('/heroes/:id',(req:Request,res:Response)=>{

    const id= req.params.id;
    const escapeId=MySql.instance.cnn.escape(id);
    const query=`
    SELECT * FROM heroes
    where id=${escapeId}`;

       MySql.ejecutarQuery(query,(err:any, heroe:Object[])=>{
                if(err){
                    res.status(400).json({
                        ok:false,
                        error:err
                    })
                }else{
                    res.json({
                        ok:true,
                        heroe:heroe
                    })
                }
       })
});

export default router;