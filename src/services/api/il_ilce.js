import fs from 'fs';
import {resolve} from 'path';
import { QueryGeneral } from '../mysql.js';
export let AdresRoutes = (router) => {
  router.post("/adres/iller", GetIller);
  router.post("/adres/ilceler", GetIlcelerFromIlId);
  router.post("/adres/mahalleler", GetMahallelerFromIlIdAndIlceId);
  router.post("/adres/pk", GetPostaKoduFromIlIdAndIlceIdAndMahalleId);
};

export const GetIller = async (req,res)=>{
    const sql = `Select * from iller`
    const iller = await QueryGeneral(sql);
    res.json(iller);
}
export const GetIlcelerFromIlId = async(req,res)=>{
    const {il_id} = req.body;
    console.log('il_id',req.body)
    const sql = `Select * from ilceler where il_id = ?`
    const ilceler = await QueryGeneral(sql,[il_id]);
    res.json(ilceler);
}
export const GetMahallelerFromIlIdAndIlceId = async(req,res)=>{
    const {il_id,ilce_id} = req.body;
    const sql = `Select * from mahalleler where il_id = ? and ilce_id = ?`
    const mahalleler = await QueryGeneral(sql,[il_id,ilce_id]);
    res.json(mahalleler);
}
export const GetPostaKoduFromIlIdAndIlceIdAndMahalleId = async(req,res)=>{
    const {il_id,ilce_id,mahalle_id} = req.body;
    const sql = `Select * from mahalleler where il_id = ? and ilce_id = ? and id = ?`
    const [mahalle] = await QueryGeneral(sql,[il_id,ilce_id,mahalle_id]);
    res.json(mahalle.posta_kodu);
}