BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_log] (
    [id_log] INT NOT NULL IDENTITY(1,1),
    [id_user] INT NOT NULL,
    [id_empresa] INT NOT NULL,
    [descricao] NVARCHAR(1000) NOT NULL,
    [dt_criado] DATETIME2 NOT NULL CONSTRAINT [t_log_dt_criado_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [t_log_pkey] PRIMARY KEY CLUSTERED ([id_log])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_log] ADD CONSTRAINT [t_log_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_log] ADD CONSTRAINT [t_log_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
