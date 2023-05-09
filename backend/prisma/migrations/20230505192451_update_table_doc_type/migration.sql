BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[t_modelo_doc] ADD CONSTRAINT [t_modelo_doc_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_modelo_doc] ADD CONSTRAINT [t_modelo_doc_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
