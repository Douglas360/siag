BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_prioridade] (
    [id] INT NOT NULL IDENTITY(1,1),
    [text] NVARCHAR(1000) NOT NULL,
    [color] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [t_prioridade_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[t_agenda] (
    [id] INT NOT NULL IDENTITY(1,1),
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [text] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [ownerId] INT,
    [priorityId] INT,
    CONSTRAINT [t_agenda_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[t_agenda_usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_appointment] INT NOT NULL,
    [id_user] INT NOT NULL,
    CONSTRAINT [t_agenda_usuario_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_agenda] ADD CONSTRAINT [t_agenda_ownerId_fkey] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[t_user]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_agenda] ADD CONSTRAINT [t_agenda_priorityId_fkey] FOREIGN KEY ([priorityId]) REFERENCES [dbo].[t_prioridade]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_agenda_usuario] ADD CONSTRAINT [t_agenda_usuario_id_appointment_fkey] FOREIGN KEY ([id_appointment]) REFERENCES [dbo].[t_agenda]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_agenda_usuario] ADD CONSTRAINT [t_agenda_usuario_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_user]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
