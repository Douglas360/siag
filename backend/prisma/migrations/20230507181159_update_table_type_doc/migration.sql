BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[t_modelo_doc] DROP CONSTRAINT [t_modelo_doc_descricao_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
