import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { DOCUMENTS_BUCKET, REGION } from "../config.js"
import { newId } from "./ids.js"

const s3 = new S3Client({ region: REGION })

export async function presignUpload({ employeeId, documentType, filename, contentType }) {
  const safeName = String(filename || "document").replace(/[^\w.\-]+/g, "_")
  const key = `employees/${employeeId}/${documentType}/${newId()}_${safeName}`
  const command = new PutObjectCommand({
    Bucket: DOCUMENTS_BUCKET,
    Key: key,
    ContentType: contentType || "application/octet-stream",
    ServerSideEncryption: "AES256",
  })
  const upload_url = await getSignedUrl(s3, command, { expiresIn: 900 })
  return { s3_key: key, upload_url, expires_in: 900 }
}

export async function deleteObject(key) {
  if (!key) return
  await s3.send(new DeleteObjectCommand({ Bucket: DOCUMENTS_BUCKET, Key: key }))
}
