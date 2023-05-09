/*
  Warnings:

  - Added the required column `updatedAt` to the `t_user` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_user] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_user_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[lastLogin] DATETIME2,
[updatedAt] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
