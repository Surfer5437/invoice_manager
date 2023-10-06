"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { algorithm, key, iv } = require("../config");
const crypto = require('crypto');

/** Related functions for companies. */

class Invoice {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO invoices (date,
                             amount,
                             service_type,
                             file_url,
                             company_id,
                             job_po_number)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING id, 
           date,
           amount,
           service_type,
           file_url,
           company_id,
           job_po_number`,
        [
          data.date,
          data.amount,
          data.service_type,
          data.file_url,
          data.company_id,
          data.job_po_number
        ]);
    let job = result.rows[0];
    const dataToEncrypt = JSON.stringify(job);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    // Step 3: Store and manage the key securely
    
// Step 4: Decrypt data
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');
return JSON.parse(decryptedData)
  }

  /** Find all jobs (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches)
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   * */

  static async findAll() {
    let query = await db.query(
      `SELECT i.id,
      i.date,
      i.amount,
      i.service_type,
      i.file_url,
      i.job_po_number,
      c.name AS "companyName"
        FROM invoices i 
        LEFT JOIN companies AS c ON c.id = i.company_id`);
    let allInvoices = query.rows;
    const dataToEncrypt = JSON.stringify(allInvoices);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    // Step 3: Store and manage the key securely
    
// Step 4: Decrypt data
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');
return JSON.parse(decryptedData)

  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const invoiceRes = await db.query(
          `SELECT id as "invoiceNumber",
                  date,
                  amount,
                  service_type,
                  file_url,
                  company_id
           FROM invoices
           WHERE id = $1`, [id]);

    const invoice = invoiceRes.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice: ${id}`);

    const companiesRes = await db.query(
          `SELECT id,
                  name,
                  address,
                  contact_name,
                  phone_number
           FROM companies
           WHERE id = $1`, [invoice.company_id]);

    delete invoice.company_id;
    invoice.company = companiesRes.rows[0];
    const dataToEncrypt = JSON.stringify(invoice);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    // Step 3: Store and manage the key securely
    
// Step 4: Decrypt data
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');
return JSON.parse(decryptedData)

  }

  /** Update invoice data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data);
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE invoices 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id as "invoiceNumber", 
                                date, 
                                amount, 
                                service_type,
                                file_url,
                                job_po_number`;
    const result = await db.query(querySql, [...values, id]);
    const invoice = result.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice: ${id}`);
    const dataToEncrypt = JSON.stringify(invoice);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    // Step 3: Store and manage the key securely
    
// Step 4: Decrypt data
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');
return JSON.parse(decryptedData)
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM invoices
           WHERE id = $1
           RETURNING id`, [id]);
    const invoice = result.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice: ${id}`);
  }
}

module.exports = Invoice;
