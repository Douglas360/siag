/*
  Warnings:

  - You are about to drop the column `descricao` on the `t_perfil_usuario` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_perfil_usuario] DROP COLUMN [descricao];
ALTER TABLE [dbo].[t_perfil_usuario] ADD [descricao_perfil] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
