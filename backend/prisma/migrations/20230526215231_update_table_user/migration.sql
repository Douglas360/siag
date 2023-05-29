/*
  Warnings:

  - You are about to drop the column `cargo` on the `t_user` table. All the data in the column will be lost.
  - You are about to drop the `t_usuario_cargo` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[t_usuario_cargo] DROP CONSTRAINT [t_usuario_cargo_id_cargo_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[t_usuario_cargo] DROP CONSTRAINT [t_usuario_cargo_id_usuario_fkey];

-- AlterTable
ALTER TABLE [dbo].[t_user] DROP COLUMN [cargo];
ALTER TABLE [dbo].[t_user] ADD [id_cargo] INT;

-- DropTable
DROP TABLE [dbo].[t_usuario_cargo];

-- AddForeignKey
ALTER TABLE [dbo].[t_user] ADD CONSTRAINT [t_user_id_cargo_fkey] FOREIGN KEY ([id_cargo]) REFERENCES [dbo].[t_cargo]([id_cargo]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
