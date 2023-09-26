"use strict";
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { algorithm, key, iv } = require("../config");
const crypto = require('crypto');

/** Related functions for companies. */

class Company {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { name, address, contact_name, phone_number, tax_id }
   *
   * Returns { id, name, address, contact_name, phone_number, tax_id }
   *
   * Throws BadRequestError if company name already in database.
   * */

  static async create({ name, address, contact_name, phone_number, tax_id }) {
    const duplicateCheck = await db.query(
          `SELECT name
           FROM companies
           WHERE name = $1`,
        [name]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${name}`);

    const result = await db.query(
          `INSERT INTO companies
           (name, address, contact_name, phone_number, tax_id)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, name, address, contact_name, phone_number, tax_id`,
        [
          name,
          address, 
          contact_name, 
          phone_number, 
          tax_id
        ],
    );

    const dataToEncrypt = JSON.stringify(result.rows[0]);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
  }

  /** Find all companies
   * Returns [{ name, address, contact_name, phone_number, tax_id }, ...]
   * */

  static async findAll() {
    let query = await db.query(
      `SELECT id,
                        name,
                        address,
                        contact_name,
                        phone_number,
                        tax_id
                 FROM companies`
    );
    // Step 2: Encrypt data
    const dataToEncrypt = JSON.stringify(query.rows);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    // Step 3: Store and manage the key securely
    
// Step 4: Decrypt data
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');
return JSON.parse(decryptedData)
// console.log('key', key)
// console.log('iv', iv)
// console.log('Original Data:', dataToEncrypt);
// console.log('Encrypted Data:', encryptedData);
// console.log('Decrypted Data:', decryptedData);

    // const securedCompanyInfo = jwt.sign({companies: query.rows}, SECRET_KEY)
    //   return encryptedToken;
  }

  /** Given a company id number, return data about company.
   *
   * Returns { name, address, contact_name, phone_number, tax_id, and invoices for company. }
   *   where invoices is [{ id, date, amount, service_type, file_url, company_id, job_po_number }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    console.log(typeof id)
    const companyRes = await db.query(
          `SELECT name,
                  address,
                  contact_name,
                  phone_number,
                  tax_id
           FROM companies
           WHERE id = $1`,
        [id]);

    const company = companyRes.rows[0];

    if (!company) throw new NotFoundError(`No company: ${id}`);

    const invoices = await db.query(
          `SELECT id, date, amount, service_type, file_url, company_id, job_po_number
           FROM invoices
           WHERE company_id = $1
           ORDER BY date`,
        [id],
    );

    company.invoices = invoices.rows;

    const dataToEncrypt = JSON.stringify(company);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');
return JSON.parse(decryptedData)
  }

  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data);
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE companies 
                      SET ${setCols} 
                      WHERE id = ${handleVarIdx} 
                      RETURNING id,
                      name,
                      address,
                      contact_name,
                      phone_number,
                      tax_id`;
    const result = await db.query(querySql, [...values, id]);
const company = result.rows[0];
    if (!company) {
      throw new NotFoundError(`No company: ${id}`)
    } else {
      const dataToEncrypt = JSON.stringify(company);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
    };

    
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM companies
           WHERE id = $1
           RETURNING name`,
        [id]);
    const company = result.rows[0];

    if (!company) {
      throw new NotFoundError(`No company: ${id}`)
    } else {
      const dataToEncrypt = JSON.stringify(company);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
    };
  }
}


module.exports = Company;
